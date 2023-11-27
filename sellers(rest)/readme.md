# Django Restful API

## 安装依赖

运行以下命令安装依赖

```bash
pip install -r requirements.txt
```

## 添加前端代码

将前端的 `index.html` 文件放入 `templates` 文件夹中（如果存在修改），然后将前端涉及的其他 css、js 文件放到根目录的 `front_static` 文件夹中。

## 运行

### 初始化数据库

若数据库不存在，运行以下命令初始化数据库

```bash
python manage.py makemigrations
python manage.py migrate
```

### 运行服务器

运行以下命令运行服务器

```bash
python manage.py runserver
```
