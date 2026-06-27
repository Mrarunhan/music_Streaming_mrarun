
const { Song, Like, Plays } = require("../models/song.model");

const CreateSongRepository = async ({
  title,
  description,
  genre,
  UserId,
  thumbnail,
  audio,
  duration,
}) => {
  const song = await Song.create({
    title: title,
    description: description,
    genre: genre,
    artist: UserId,
    thumbnail: thumbnail,
    audio: audio,
    duration: duration,
  });

  return !!song;
};

const PeginationSongRepository = async ({ limit, skip }) => {
  const pagination = await Song.find().skip(skip).limit(limit);

  const totolSong = await Song.countDocuments();

  return {
    pagination,
    totolPage: Math.ceil(totolSong / limit),
  };
};

const TopSongRepository = async ({ limit }) => {
  const songlist = await Song.aggregate([
    {
      $addFields: {
        score: {
          $add: ["$totalPlay", { $multiply: ["$totalLikes", 10] }],
        },
      },
    },
    { $sort: { score: -1 } },
    { $limit: limit },
  ]).allowDiskUse(true);

  return songlist;
};

const SearchSongRepository = async ({ searchs }) => {
  const searchSongs = await Song.aggregate([
    {
      $facet: {
        searchResults: [
          {
            $search: {
              index: "default",
              text: {
                query: searchs,
                path: { wildcard: "*" },
              },
            },
          },
          {
            $addFields: {
              searchScore: { $meta: "searchScore" },
            },
          },
          {
            $sort: { searchScore: -1 },
          },
          {
            $limit: 10,
          },
        ],

        fallbackResults: [
          {
            $match: {
              totalLikes: { $gte: 50 },
            },
          },
          {
            $sort: { totalLikes: -1 },
          },
          {
            $limit: 10,
          },
        ],
      },
    },

    // merge both arrays
    {
      $project: {
        results: {
          $concatArrays: ["$searchResults", "$fallbackResults"],
        },
      },
    },

    // unwind merged results
    { $unwind: "$results" },

    // replace root
    { $replaceRoot: { newRoot: "$results" } },
  ]);

  return searchSongs;
};



const CreateLikeSongRepository = async ({songsId }) => {
    const likesSong =await Song.findOneAndUpdate(
        {_id : songsId},
        {$inc : {
            totalLikes : 1
        }}
    )

    return !!likesSong
}

const RemoveLikeSongRepository = async ({songsId}) => {
    const dislikesSong = await Song.findOneAndUpdate(
        {_id : songsId},
        {$inc : {totalLikes : -1 }}
    )
}

const PlaysSongRepository = async ({songsId }) => {
    const PlaysSong =await Song.findOneAndUpdate(
        {_id : songsId},
        {$inc : {
            totalPlay : 1
        }}
    )

    return !!PlaysSong
}


const CreateLikeRepository = async ({songId, userId}) => {
  const likedsong = await Like.create({
      likes : useId,
      musicId : songId
  })

  return !!likedsong
}

const RemoveLikeRepository  = async ({songId , userId}) => {
    const removelikes = await Like.deleteOne({
      likes : userId,
      musicId : songId
    })

    return !!removelikes;
}

const CreatePlayRepository = async ({songId, userId}) => {
  const Playedsong = await Plays.create({
      Plays : useId,
      musicId : songId
  })

  return !!Playedsong
}

module.exports = {
    CreateSongRepository,
    PeginationSongRepository,
    TopSongRepository,
    SearchSongRepository,
    CreateLikeSongRepository,
    RemoveLikeSongRepository,
    PlaysSongRepository,
    CreateLikeRepository,
    RemoveLikeRepository,
    CreatePlayRepository
}