# Generated by Django 2.2 on 2019-04-29 08:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TaskList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('created_at', models.DateTimeField()),
                ('due_on', models.DateTimeField()),
                ('status', models.CharField(max_length=200)),
                ('task_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lab13.TaskList')),
            ],
        ),
    ]
