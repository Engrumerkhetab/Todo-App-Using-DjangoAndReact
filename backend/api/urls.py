from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    # Todo URLs
    path('todo/<user_id>/', views.TodoListView.as_view(), name='todo'),
    path("todo-detail/<user_id>/<todo_id>/", views.TodoDetailView.as_view()),
    path('todo-mark-as-completed/<user_id>/<todo_id>/', views.TodoMarkAsCompleted.as_view()),
    
    
]