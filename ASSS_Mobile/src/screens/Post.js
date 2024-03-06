import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Post = ({ avatar, username, status, image, commentCount, likeCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../library/images/home1.png')}  style={styles.avatar} />
        <Text style={styles.username}>Trịnh Bảo Duy</Text>
      </View>
      <Text style={styles.status}>Nhà cần bán</Text>
      <Image source={require('../library/images/home1.png')} style={styles.image} />
      <View style={styles.footer}>
      <TouchableOpacity style={styles.action}>
          <Icon name="heart-o" size={20} color="#000" />
          <Text style={styles.count}>{likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Icon name="comment-o" size={20} color="#000" />
          <Text style={styles.count}>{commentCount}</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: 5,
  },
};

export default Post;