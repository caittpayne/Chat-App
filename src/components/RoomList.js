import React, { Component } from 'react';
import './main.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
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

  openEdit() {
    //set class to show edit
  }

  editRooms(room, data) {
    const array = [...this.state.rooms];
    const i = array.indexOf(room);
    array[i].name = data;

    console.log(array[i].name);
    console.log(data);
    console.log(i);

    this.roomsRef.child(room.key).update({ name: data });
    this.setState({
      rooms: array
    });
  }

  deleteRooms(room, index) {
      const newList = [...this.state.rooms];
      this.roomsRef.child(room.key).remove();
      newList.splice(index, 1);
      this.setState({ rooms: newList });
  }

  render() {
    return (
      <section className={this.props.hide}>
        <section className='roomList'>
        {
          this.state.rooms.map((room, index) =>
            <section key={index}>
              <div onClick={() => this.props.roomClick(room.key, room.name)}>{room.name}</div>
              <button onClick={() => this.openRoomEdit()}>Edit</button>
              <section className='roomEditForm'>
                <input type='text' defaultValue={room.name} id={room.key}/>
                <button type='button' onClick={() => this.editRooms(room, document.getElementById(room.key).value)}>Submit</button>
                <button type='button' onClick={() => this.deleteRooms(room, index)}>Delete</button>
              </section>
            </section>
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
