const db = require('./db')
const { STRING } = db.Sequelize;

// require each of your models here...

// ...and give them some nice associations here!
//
//

const Artist = db.define('artist', {
  name: {
    type: STRING
  }
});

const Album = db.define('album', {
  name: {
    type: STRING
  },
  artworkUrl: {
    type: STRING
  }
});

const Song = db.define('song', {
  name: {
    type: STRING
  },
  genre: {
    type: STRING
  }
});

Album.belongsTo(Artist);
Album.hasMany(Song);
Song.belongsTo(Artist);
Song.belongsTo(Album);

const syncAndSeed = async()=> {
  const songs = require('../../songs.json');
  await db.sync({force: true})

  // artists
  const dexter = await Artist.create({name: 'Dexter Britain'})
  const jets = await Artist.create({name: 'Jets Overhead'})
  const nin = await Artist.create({name: 'Nine Inch Nails'})

  // albums
  const ccv2 = await Album.create({
    name: 'Creative Commons Volume 2',
    artistId: dexter.id,
    artworkUrl: 'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/creative_commons_vol_2.jpeg'
  })
  const zenith = await Album.create({
    name: 'Zenith',
    artistId: dexter.id,
    artworkUrl: 'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/zenith.jpeg'
  })
  const noNations = await Album.create({
    name: 'No Nations (Instrumentals)',
    artistId: jets.id,
    artworkUrl: 'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/no_nations.jpeg'
  })
  const ghosts = await Album.create({
    name: 'Ghosts I-IV',
    artistId: nin.id,
    artworkUrl: 'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/ghosts_i-iv.jpeg'
  })
  const theSlip = await Album.create({
    name: 'The Slip',
    artistId: nin.id,
    artworkUrl: 'https://learndotresources.s3.amazonaws.com/workshop/58cff0e769468300041ef9fd/the_slip.jpeg'
  })

  const artists = {
    'Dexter Britain': dexter,
    'Nine Inch Nails': nin,
    'Jets Overhead': jets
  }

  const albums = {
    'Creative Commons Volume 2': ccv2,
    'Zenith': zenith,
    'No Nations (Instrumentals)': noNations,
    'Ghosts I-IV': ghosts,
    'The Slip': theSlip
  }

  await Promise.all(songs.map(song => Song.create({
    name: song.name,
    audioUrl: song.audioUrl,
    albumId: albums[song.album].id,
    artistId: artists[song.artist].id,
    genre: song.genre
  })))
};

module.exports = {
  db,
  syncAndSeed,
  models: {
    Album,
    Artist,
    Song
  }
  // Include your models in your module.exports as well!
  // The seed file expects to find them there!
}
