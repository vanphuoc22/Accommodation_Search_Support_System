# Generated by Django 5.0 on 2024-01-23 18:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ASSSs', '0022_notice_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='follow',
            options={},
        ),
        migrations.AlterField(
            model_name='post',
            name='house',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_query_name='posts', to='ASSSs.house'),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('follower', 'followeduser')},
        ),
    ]
