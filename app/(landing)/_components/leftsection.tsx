"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Article {
  source: { id: string; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const LeftSec = () => {
    const [headingContent, setHeadingContent] = useState<Article[]>([]); // Define the type
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        axios.get("https://newsapi.org/v2/top-headlines?apiKey=5b9496671e244ce6990752f8138f18bb&q=cricket")
        .then((res) => {
            console.log(res.data);
            setHeadingContent(res.data.articles as Article[]); // Update state correctly
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false); // Set loading to false in case of error
        });
    }, []);

    return (
        <div className="lg:flex items-center justify-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="h-[20rem] mb-[20rem]">
                        {headingContent.map((article, index) => (
                            <div className="mb-[2rem]" key={index}>
                                <img src={article.urlToImage} alt={article.title} />
                                <p className="text-start">{article.title}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
