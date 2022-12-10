import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    date: String,
    winnerId: String,
    loserId: String,
    winnerScore: Number,
    loserScore: Number,
  },
  { collection: "history" }
);

export default mongoose.models.History ||
  mongoose.model("History", HistorySchema);
