import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )})
    });
  }

  createRooms(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });

    document.getElementById('new').value='';

  }

  render() {
    return (
      <section>
        <section className='roomList'>
        {
          this.state.rooms.map((room, index) =>
            <div key={index}>{room.name}</div>
          )
        }
        </section>
        <section>
          <form>
            <input type='text' id='new'/>
            <button type='button' onClick={() => this.createRooms(document.getElementById('new').value)}>Create</button>
          </form>
        </section>
      </section>
    )
  }
}

export default RoomList;
