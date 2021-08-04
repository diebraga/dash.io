from rest_framework.generics import RetrieveDestroyAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import UserAccount
from .serializers import UserCreateSerializer

class DeleteUser(RetrieveDestroyAPIView):
    permission_classes = (permissions.IsAdminUser, )
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer
    pagination_class = None

class UserView(RetrieveAPIView):
    queryset = UserAccount.objects.order_by('-date_created')
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = (permissions.AllowAny, )


#      user permissions
#     'user': ['djoser.permissions.CurrentUserOrAdminOrReadOnly']
# 
# Defaults

# {
#     'activation': ['rest_framework.permissions.AllowAny'],
#     'password_reset': ['rest_framework.permissions.AllowAny'],
#     'password_reset_confirm': ['rest_framework.permissions.AllowAny'],
#     'set_password': ['djoser.permissions.CurrentUserOrAdmin'],
#     'username_reset': ['rest_framework.permissions.AllowAny'],
#     'username_reset_confirm': ['rest_framework.permissions.AllowAny'],
#     'set_username': ['djoser.permissions.CurrentUserOrAdmin'],
#     'user_create': ['rest_framework.permissions.AllowAny'],
#     'user_delete': ['djoser.permissions.CurrentUserOrAdmin'],
#     'user': ['djoser.permissions.CurrentUserOrAdmin'],
#     'user_list': ['djoser.permissions.CurrentUserOrAdmin'],
#     'token_create': ['rest_framework.permissions.AllowAny'],
#     'token_destroy': ['rest_framework.permissions.IsAuthenticated'],
# }
