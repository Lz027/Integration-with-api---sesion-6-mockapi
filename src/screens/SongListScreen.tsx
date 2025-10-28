import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Linking,
  TouchableOpacity,
} from 'react-native';

interface Song {
  id: string;
  name: string;
  uId: string;
  img: string;
  eId: string;
}

const SongListScreen: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSongs = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch('https://openwhyd.org/hot/electro?format=json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // The API returns an object with a 'tracks' array
      if (data && data.tracks) {
        const songData: Song[] = data.tracks.map((track: any) => ({
          id: track.uId || Math.random().toString(), // Use uId as a fallback for a unique key
          name: track.name || 'Untitled Song',
          uId: track.uId,
          img: track.img,
          eId: track.eId, // This contains the platform and video ID (e.g., /yt/VIDEO_ID)
        }));
        setSongs(songData);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (e) {
      console.error('Error fetching songs:', e);
      setError('Failed to fetch songs. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSongs();
  };

  const handleSongPress = (eId: string) => {
    // eId format is typically /yt/VIDEO_ID or /sc/TRACK_ID
    const [platform, id] = eId.substring(1).split('/');
    let url = '';

    if (platform === 'yt') {
      url = `https://www.youtube.com/watch?v=${id}`;
    } else if (platform === 'sc') {
      // OpenWhyd uses Soundcloud IDs, which are harder to map to a direct URL without more info.
      // For simplicity, we can try to open the OpenWhyd page for the track.
      url = `https://openwhyd.org/c/${id}`;
    } else {
      console.warn('Unsupported platform for eId:', eId);
      return;
    }

    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading songs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchSongs}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSongPress(item.eId)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Tap to view on source platform</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SongListScreen;
