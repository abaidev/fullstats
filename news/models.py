from django.db import models
from django.db.models import Sum
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from pytils.translit import slugify
from account.models import UserRate

User = get_user_model()


class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=350)
    slug = models.SlugField(max_length=350)
    content = models.TextField()
    views_num = models.IntegerField(default=0)
    rating = GenericRelation(UserRate)
    # favorites_m2m = models.ManyToManyField(User, related_name='favorites', blank=True, default=None)

    def save(self,  *args, **kwargs):
        self.slug = slugify(self.title)
        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def total_rating(self):
        # qs = Article.objects.prefetch_related('rating') ...
        rate_sum_dict = self.rating.all().aggregate(Sum('rate'))
        return rate_sum_dict['rate__sum'] or 0


