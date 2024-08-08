<template>
  <div class="user-list">
    <h2 style="margin-bottom: 30px;">Список пользователей</h2>
    <div class="search-container">
      <input v-model="nameSearch" type="text" placeholder="Поиск по имени" />
      <select v-model="roleSearch">
        <option value="">Все роли</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
    </div>
    <div class="table-container">
      <div class="table-header">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th style="width: 5%;">ID</th>
              <th style="width: 20%;">Имя пользователя</th>
              <th style="width: 20%;">Время создания</th>
              <th style="width: 20%;">Роль</th>
              <th style="width: 35%;">Действия</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table-content">
        <table class="table table-bordered table-striped">
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td style="width: 5%;">{{ user.id }}</td>
              <td style="width: 20%;">{{ user.username }}</td>
              <td style="width: 20%;">{{ formatDateTime(user.created_at) }}</td>
              <td @dblclick="editRole(user)" style="cursor: pointer; width: 20%;">
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
                <button @click="deleteUserId = user.id; showConfirmModal = true">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="exitPage" class="closeIcon" @click="exitPage"></div>
    <div id="backButton" @click="goBack">←</div>
    <ConfirmModal :message="'Точно хотите удалить пользователя?'" :isVisible="showConfirmModal"
        @confirm="deleteUser" @cancel="showConfirmModal = false" />
  </div>
</template>


<script>
import ConfirmModal from '@/components/shared/ConfirmModal.vue';
import { Roles } from '@/models/attributeEnums';
import { UserResponse } from '@/models/responses';
import api from '@/services/api/user';

export default {
  data() {
    return {
      users: [],
      roles: [Roles.ADMIN, Roles.USER, Roles.BANNED],
      nameSearch: '',
      roleSearch: '',
      showConfirmModal: false,
      deleteUserId: null
    };
  },
  components: {ConfirmModal},
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const nameMatches = user.username.toLowerCase().includes(this.nameSearch.toLowerCase());
        const roleMatches = this.roleSearch ? user.role === this.roleSearch : true;
        return nameMatches && roleMatches;
      });
    }
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
        await api.assignRoleUser(userId, { roleName: Roles.BANNED });
        const userToBlock = this.users.find(user => user.id === userId);
        userToBlock.role = Roles.BANNED;
        console.log(`User with ID ${userId} has been banned.`);
      } catch (error) {
        console.error('Error banned user:', error);
      }
    },
    async unBlockUser(userId) {
      try {
        await api.assignRoleUser(userId, { roleName: Roles.USER });
        const userToBlock = this.users.find(user => user.id === userId);
        userToBlock.role = Roles.USER;
        console.log(`User with ID ${userId} has been unbanned.`);
      } catch (error) {
        console.error('Error unbanned user:', error);
      }
    },
    async deleteUser() {
      try {
        await api.deleteUser(this.deleteUserId);
        this.users = this.users.filter(user => user.id !== this.deleteUserId);
        this.deleteUserId = null;
        this.showConfirmModal = false;
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    editRole(user) {
      this.users.forEach(user => {
        user.editingRole = false;
      });
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
    goBack() {
      this.$router.go(-1);
    },
    exitPage() {
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
  text-align: center;
  min-width: 900px;
  overflow: hidden;
}

.search-container {
  margin-bottom: 20px;
  width: 100%;
  text-align: end;
}

.search-container input,
.search-container select {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--contour-elements);
  font-size: 14px;
}

.table-container {
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
}

.table-container::-webkit-scrollbar {
  display: none;
}

.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.table-content {
  overflow-y: auto;
}

.table {
  width: 100%;
  margin-bottom: 0;
  background-color: inherit;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  vertical-align: middle;
  border: 1px solid var(--contour-elements);
  text-align: center;
}

.table th {
  font-weight: bold;
  background-color: var(--background-toolbox-contourbar);
  color: var(--contour-elements);
}

.table tbody tr:nth-child(even) {
  background-color: var(--background-toolbox-contourbar);
}

td button {
  background-color: #d9d9d9;
  color: black;
  border-radius: 5px;
  height: 30px;
  padding-left: 10px; padding-right: 10px;
  cursor: pointer;
  border: none;
}

td button:hover {
  background-color: #adadad;
}

.closeIcon,
#exitPage {
  position: absolute;
  top: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid var(--contour-elements);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
}

.closeIcon::before,
.closeIcon::after,
#exitPage::before,
#exitPage::after {
  content: '';
  position: absolute;
  background-color: var(--contour-elements);
}

.closeIcon::before {
  transform: rotate(45deg);
}

.closeIcon::after {
  transform: rotate(-45deg);
}

#exitPage::before,
#exitPage::after {
  width: 25px;
  height: 3px;
}

#backButton {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid var(--contour-elements);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 28px;
}

#backButton:hover, #exitPage:hover {
  background-color: var(--background-toolbox-contourbar);
}

td select {
  width: calc(100% - 30px);
  max-width: 180px;
  padding: 0 10px 0 10px;
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
  background-position: right 10px center;
  background-size: 20px;
}

@media(max-width: 420px) {
  .user-list{
    height: 85%;
  }
}
</style>

