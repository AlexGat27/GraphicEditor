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
            <td>{{ user.role }}</td>
            <td style="display: flex; justify-content: space-around;">
              <button v-if="user.role !== 'banned'" @click="blockUser(user.id)">Заблокировать</button>
              <button @click="deleteUser(user.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/services/api/user';

export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.getUsers();
        this.users = response.data.users;
        console.log(this.users)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    },
    async blockUser(userId) {
      try {
        await api.assignRoleUser(userId, {roleName: "banned"});
        const userToBlock = this.users.find(user => user.id === userId);
        userToBlock.role = "banned";
        console.log(`User with ID ${userId} has been banned.`);
      } catch (error) {
        console.error('Error banned user:', error);
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
    formatDateTime(dateTimeStr) {
      return new Date(dateTimeStr).toLocaleString();
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
</style>
