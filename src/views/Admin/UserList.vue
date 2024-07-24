<template>
  <div class="user-list">
    <h2>Список пользователей</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя пользователя</th>
            <th>Время создания</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ formatDateTime(user.created_at) }}</td>
            <td @dblclick="editRole(user)" style="cursor: pointer;">
              <template v-if="user.editingRole">
                <select v-model="user.role" @change="updateUserRole(user)">
                  <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                </select>
              </template>
              <template v-else>
                {{ user.role }}
              </template>
            </td>
            <td style="display: flex; justify-content: space-around;">
              <button v-if="user.role !== 'banned'" @click="blockUser(user.id)">Заблокировать</button>
              <button v-if="user.role === 'banned'" @click="unBlockUser(user.id)">Разблокировать</button>
              <button @click="deleteUser(user.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="exitPage" class="closeIcon" @click="exitPage"></div>
  </div>
</template>

<script>
import { Roles } from '@/models/attributeEnums';
import { UserResponse } from '@/models/responses';
import api from '@/services/api/user';

export default {
  data() {
    return {
      users: [],
      roles: [Roles.ADMIN, Roles.USER]
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.getUsers();
        this.users = response.data.users.map(user => new UserResponse(user));
        console.log(this.users)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    },
    async blockUser(userId) {
      try {
        await api.assignRoleUser(userId, {roleName: Roles.BANNED});
        const userToBlock = this.users.find(user => user.id === userId);
        userToBlock.role = Roles.BANNED;
        console.log(`User with ID ${userId} has been banned.`);
      } catch (error) {
        console.error('Error banned user:', error);
      }
    },
    async unBlockUser(userId){
      try {
        await api.assignRoleUser(userId, {roleName: Roles.USER});
        const userToBlock = this.users.find(user => user.id === userId);
        userToBlock.role = Roles.USER;
        console.log(`User with ID ${userId} has been unbanned.`);
      } catch (error) {
        console.error('Error unbanned user:', error);
      }
    },
    async deleteUser(userId){
      try {
        await api.deleteUser(userId);
        this.users = this.users.filter(user => user.id !== userId);
        console.log(`User with ID ${userId} has been deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    editRole(user) {
      this.users.forEach(user => {
        user.editingRole = false;
      })
      user.editingRole = true;
    },
    async updateUserRole(user) {
      try {
        await api.assignRoleUser(user.id, { roleName: user.role });
        user.editingRole = false;
        console.log(`User with ID ${user.id} role has been changed to ${user.role}.`);
      } catch (error) {
        console.error('Error changing user role:', error);
      }
    },
    formatDateTime(dateTimeStr) {
      return new Date(dateTimeStr).toLocaleString();
    },
    exitPage(){
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.user-list {
  width: 90%;
  height: 95%;
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  margin-bottom: 0;
  background-color: inherit;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  vertical-align: top;
  border: 1px solid var(--contour-elements);
  text-align: center;
}

.table th {
  font-weight: bold;
  background-color: inherit;
}
.table tbody tr:nth-child(even) {
  background-color: inherit
}

td button{
  background-color: #d9d9d9; color: black;
  border-radius: 5px; height: 30px;
  cursor: pointer;
}

.closeIcon {
    position: absolute;
    background-color: transparent;
    border: 1px solid var(--contour-elements); /* Цвет рамки */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    z-index: 1003;
  }

.closeIcon::before,
.closeIcon::after {
  content: '';
  position: absolute;
  background-color: var(--contour-elements); /* Цвет палочек крестика */
}

.closeIcon::before {
  transform: rotate(45deg); /* Первая палочка крестика */
}
.closeIcon::after {
  transform: rotate(-45deg); /* Вторая палочка крестика */
}
#exitPage{
  top:25px; right: 25px;
  width: 50px; /* Ширина квадрата */
  height: 50px; /* Высота квадрата */
}
#exitPage::before, #exitPage::after{
  width: 25px; /* Ширина палочек крестика */
  height: 3px; /* Высота палочек крестика */
}

td select {
  width: calc(100% - 30px); /* Уменьшаем ширину на padding-right для размещения стрелки */
  max-width: 180px;
  padding: 0 10px 0 10px; /* Устанавливаем padding-left для текста */
  border: 1px solid var(--contour-elements);
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: var(--background-editorfield);
  color: var(--contour-elements);
  height: 30px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%237f7f7f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center; /* Позиционирование стрелки */
  background-size: 20px; /* Увеличиваем размер стрелки */
}
</style>
