from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from profileapp.views import index_view, add_view_api

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", index_view, name="index"),
    path("api/view", add_view_api, name="add_view_api"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
