from django.contrib import admin
from accounts.models import UserAccount
from django.contrib.auth.admin import UserAdmin
from django.db import models


class UserAdminConfig(UserAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_active',)
    list_filter = ('email', 'name', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'name', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

admin.site.register(UserAccount, UserAdminConfig)
admin.site.site_header = 'DASH.IO'
