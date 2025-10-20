from dataclasses import dataclass
from django.http import HttpRequest
from .models import Profile

@dataclass
class ViewCounter:
    request: HttpRequest
    profile: Profile

    def count_once_per_session(self):
        key = f"viewed_profile_{self.profile.pk}"
        if not self.request.session.get(key, False):
            self.profile.increment_view()
            self.request.session[key] = True

    def count_always(self):
        self.profile.increment_view()
