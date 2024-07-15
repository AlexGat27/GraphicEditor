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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ formatDateTime(user.created_at) }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="blockUser(user.id)">
                Заблокировать
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

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
        // Здесь вызывайте API для блокировки пользователя по userId
        console.log('Блокировка пользователя с ID:', userId);
      } catch (error) {
        console.error('Ошибка при блокировке пользователя:', error);
      }
    },
    formatDateTime(dateTimeStr) {
      // Функция для форматирования даты и времени (при необходимости)
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

.btn-danger {
  color: var(--contour-elements);
  background-color: #6e0000;
  border-color: var(--contour-elements);
}

.btn-danger:hover {
  color: var(--contour-elements);
  background-color: #a30010;
  border-color: var(--contour-elements);
}
</style>
