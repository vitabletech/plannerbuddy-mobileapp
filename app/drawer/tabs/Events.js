import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Card, IconButton, Button } from 'react-native-paper';
import AddEventModal from '../../components/CreateEvents/AddEvent';

const Events = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddEvent = () => {
    setShowModal((state) => !state);
  };

  return (
    <>
      {showModal && <AddEventModal visible={showModal} setShowModal={setShowModal} />}
      <View>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
      </View>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Button
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 15,
            right: 15,
          }}
          icon="calendar-plus"
          mode="elevated"
          onPress={handleAddEvent}
        >
          Create Event
        </Button>
      </View>
    </>
  );
};

export default Events;
