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
    date = models.DateField(auto_now_add=True)
    # favorites_m2m = models.ManyToManyField(User, related_name='favorites', blank=True, default=None)

    def save(self,  *args, **kwargs):
        slug_title = self.slug or slugify(self.title)
        qs = Article.objects.filter(slug=slug_title)
        if qs.exists() and self not in qs:
            last = Article.objects.last()   # just for not wasting time
            slug_title = slug_title + f'-{last.id * 2}'
        self.slug = slug_title
        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    @property
    def total_rating(self):
        # qs = Article.objects.prefetch_related('rating') ...
        rate_sum_dict = self.rating.all().aggregate(Sum('rate'))
        return rate_sum_dict['rate__sum'] or 0


