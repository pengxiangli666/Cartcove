from django.contrib import admin
from .models import CartItem, Category, Product

# 使用简单的方式注册CartItem模型
admin.site.register(CartItem)

# 为Category模型提供自定义的管理界面
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent']  # 在列表页显示的字段
    search_fields = ['name']  # 列表页的搜索字段

# 为Product模型提供自定义的管理界面
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category']  # 在列表页显示的字段
    search_fields = ['name']  # 列表页的搜索字段
    list_filter = ['category']  # 列表页的过滤器
