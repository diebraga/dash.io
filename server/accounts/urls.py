from django.urls import path
from .views import UserView, DeleteUser


urlpatterns = [
    path('delete/<int:pk>', DeleteUser.as_view()),
    path('<pk>', UserView.as_view()),
]
