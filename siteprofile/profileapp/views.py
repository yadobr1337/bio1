from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
from .models import Profile
from .services import ViewCounter

def get_or_create_profile():
    obj, _ = Profile.objects.get_or_create(
        pk=1,
        defaults={
            "display_name": "dobr1",
            "avatar": "avatars/photo_2025-10-20_23-34-48.jpg",
            "steam_url": "https://steamcommunity.com/id/siskiclub/",
            "discord_url": "https://discordapp.com/users/950157897348833290",
            "telegram_url": "https://t.me/dobr1337",
        },
    )
    return obj

def index_view(request):
    profile = get_or_create_profile()
    context = {
        "profile": profile,
        "video_src": settings.STATIC_URL + "media/IMG_7584.MP4",
        "audio_src": settings.STATIC_URL + "media/1111111.mp3",
    }
    return render(request, "index.html", context)

def add_view_api(request):
    profile = get_or_create_profile()
    ViewCounter(request, profile).count_always()
    resp = JsonResponse({"views": profile.views})
    resp["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    resp["Pragma"] = "no-cache"
    return resp
