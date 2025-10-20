from django.db import models

class Profile(models.Model):
    display_name = models.CharField(max_length=64)
    avatar = models.ImageField(upload_to="avatars/")
    steam_url = models.URLField()
    discord_url = models.URLField()
    telegram_url = models.URLField()
    views = models.PositiveIntegerField(default=0)

    def increment_view(self):
        self.views = models.F("views") + 1
        self.save(update_fields=["views"])
        self.refresh_from_db(fields=["views"])

    def __str__(self):
        return self.display_name
