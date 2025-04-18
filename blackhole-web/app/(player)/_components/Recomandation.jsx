"use client";

import AlbumCard from "@/components/cards/album";
import SongCard from "@/components/cards/song";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { NextContext } from "@/hooks/use-context";
import { getSongsByQuery, getSongsSuggestions } from "@/lib/fetch";
import { useContext, useEffect, useState } from "react";

const musicKeywords = [
  "top",
  "topchart",
  "charts",
  "trending",
  "popular",
  "latest",
  "new",
  "fresh",
  "hot",
  "hits",
  "viral",
  "now",
  "featured",
  "editor's pick",
  "weekly top",
  "daily mix",
  "recommended",
  "most played",
  "just dropped",
  "music buzz",
  "top 50",
  "top 100",
  "best of [year]",
  "release radar",
  "mood mix",
  "party",
  "radio",
  "discover",
  "fan favorites",
  "this week",
];

export default function Recomandation({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const next = useContext(NextContext);

  // const getData = async () => {
  //     await getSongsSuggestions(id)
  //         .then(res => res.json())
  //         .then(data => {
  //             setData(data.data);
  //             let d = data.data[Math.floor(Math.random() * data.data.length)];
  //             next.setNextData({
  //                 id: d.id,
  //                 name: d.name,
  //                 artist: d.artists.primary[0]?.name || "unknown",
  //                 album: d.album.name,
  //                 image: d.image[1].url
  //             });
  //             setLoading(false);
  //         });
  //     }
  //     useEffect(() => {
  //         getData();
  // }, [])

  const classifySong = async (songName, artistName) => {
    const prompt = `TYPE OF SONG "${songName}" BY "${artistName}" IDENTIFY FROM THESE CATEGORIES WHICH IS CLOSEST: "BREAKUP", "SAD", "HAPPY", "MOTIVATIONAL". RETURN ONLY ONE WORD.`;
    console.log(prompt);
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getData = async () => {
    const shuffledKeywords = shuffleArray(musicKeywords);
    const randomQuery = shuffledKeywords[0]; // Get the first item after shuffle

    const get = await getSongsByQuery(randomQuery);
    const data = await get.json();

    console.log(
      "This is the song data before categorization:",
      data.data.results
    );

    // Set the categorized songs data
    setData(data.data.results);
    next.setSongs(data.data.results);

    // Classify each song asynchronously
    const songsWithCategory = await Promise.all(
      data.data.results.map(async (song) => {
        const category = await classifySong(
          song.name,
          song.artists.primary[0]?.name || "Unknown Artist"
        );
        return {
          ...song,
          category,
        };
      })
    );

    console.log(
      "This is the song data after categorization:",
      songsWithCategory
    );

    // Set the categorized songs data
    setData(songsWithCategory);

    // Randomly select a song for the next data
    let d =
      songsWithCategory[Math.floor(Math.random() * songsWithCategory.length)];
    next.setNextData({
      id: d.id,
      name: d.name,
      artist: d.artists.primary[0]?.name || "unknown",
      album: d.album.name,
      image: d.image[1].url,
    });

    // Set loading to false after data is processed
    setLoading(false);
  };

  // Call getData when the component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="py-10 px-6 md:px-20 lg:px-32">
      <div>
        <h1 className="text-base font-medium">Recomandation</h1>
        <p className="text-xs text-muted-foreground">Related to your search</p>
      </div>
      <ScrollArea className="rounded-md mt-4">
        {!loading && data && (
          <div>
            <div className="flex gap-6">
              {data.map((song) => (
                <AlbumCard
                  key={song.id}
                  image={song.image[2].url}
                  album={song.album.name}
                  title={song.name}
                  artist={song.artists.primary[0]?.name || "unknown"}
                  id={song.id}
                />
              ))}
            </div>
          </div>
        )}
        {loading && (
          <div className="flex gap-6">
            <div className="grid gap-2">
              <Skeleton className="h-[200px] w-[200px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20 -mt-1" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-[200px] w-[200px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20 -mt-1" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-[200px] w-[200px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20 -mt-1" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-[200px] w-[200px]" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20 -mt-1" />
            </div>
          </div>
        )}
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      {!loading && !data && (
        <div className="flex items-center justify-center text-center h-[100px]">
          <p className="text-sm text-muted-foreground">
            No recomandation for this song.
          </p>
        </div>
      )}
    </section>
  );
}
