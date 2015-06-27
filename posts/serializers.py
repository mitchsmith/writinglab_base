from rest_framework import serializers
from authentication.serializers import AccountSerializer
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    """
    Serialize a post instance, along with its nested account relation via author.
    Setting AccountSerializer to read_only=True prevents updating it with the post.  
    """
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        """
        Add nested relation to author to the list of validation exclusions.
        """
        exclusions = super(PostSerializer, self).get_validation_exclusions()

        return exclusions + ['author']
