
using Chess.Interfaces;
using Chess.Models;
public record struct Turn(string Move, Piece Piece, Piece? Capture) { }