#!/bin/bash

# Переменные
LOCAL_DIR="./dist/"        # Локальная директория для копирования
REMOTE_USER="sanyagataulin"               # Имя пользователя на удаленном сервере
REMOTE_HOST="vs15.primegate.io"     # Хост удаленного сервера
REMOTE_DIR="/srv/www/motocan.sultanovlab.ru/htdocs/GraphicEditor/dist/"     # Директория на удаленном сервере

# Проверка на существование локальной директории
if [ ! -d "$LOCAL_DIR" ]; then
  echo "Ошибка: Локальная директория $LOCAL_DIR не существует."
  exit 1
fi

# Копирование файлов с использованием scp
echo "Копирование файлов из $LOCAL_DIR на $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR..."

scp -r "$LOCAL_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

# Проверка успешности выполнения
if [ $? -eq 0 ]; then
  echo "Копирование завершено успешно."
else
  echo "Ошибка при копировании файлов."
  exit 1
fi