﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieBookingApp.Models
{
    [BsonIgnoreExtraElements]
    public class Movie
    {
        [JsonIgnore]
        [BsonId]
        public string Id { get; set; } = string.Empty;
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;
        [BsonElement("theatreName")]
        public string TheatreName { get; set; } = string.Empty;
        [BsonElement("ticketsAlloted")]
        public int TicketsAlloted { get; set; }
        [BsonElement("ticketsBooked")]
        public int TicketsBooked { get; set; }
    }

    //[BsonIgnoreExtraElements]
    public class TicketStatusResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }

    public class DeleteMovieByNameAndIdResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
}
