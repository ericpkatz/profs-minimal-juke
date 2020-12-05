import React from 'react'
import axios from 'axios';

class Album extends React.Component{
  constructor(){
    super();
    this.state = {
      album: {}
    };
  }
  async componentDidMount(){
    this.setState({ album: (await axios.get(`/api/albums/${this.props.albumId}`)).data});
  }
  render(){
    const { album } = this.state;
    if(!album.id){
      return '...loading';
    }
    return (
      <div>
        <a href='#'>All Albums</a>
        <h1>{ album.name }</h1>
        <h2>{ album.artist.name }</h2>
        <ul>
          {
            album.songs.map( song => {
              return (
                <li key={ song.id }>
                  { song.name }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const Albums = ({ albums })=> {
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {
          albums.map( album => {
            return (
              <li key={ album.id}>
                <a href={`#${album.id}`}>{ album.name }</a>
                <br />
                <img src={ album.artworkUrl } style={{ width: '100px', height: '100px'}}/>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      albums: [],
      albumId: ''
    };
  }
  async componentDidMount(){
    this.setState({ albums: (await axios.get('/api/albums')).data});
    window.addEventListener('hashchange', ()=> {
      this.setState({ albumId: window.location.hash.slice(1)});
    });
    this.setState({ albumId: window.location.hash.slice(1)});
  }
  render () {
    const { albums, albumId } = this.state;
    console.log(albumId);
    return (
      <div id='main' className='row container'>
        { albumId ? <Album albumId={ albumId }/> : <Albums albums={ albums } /> }
      </div>
    )
  }
}
