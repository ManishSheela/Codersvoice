const RoomModal = require("../models/room-model");
const RoomDto = require("../Dto/room-dto");
class RoomController {
  async create(req, res) {
    const { topic, roomType } = req.body;
    const ownerId = req.user._id;

    // store the roomtype and topic to the db
    const room = await RoomModal.create({
      topic,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return res.json(new RoomDto(room));
  }

  async getAllRooms(req, res) {
    // find(['open','private','social']) to fetch with multiple values
    const query = ["open"];
    const data = await RoomModal.find({ roomType: { $in: query } })
      .populate("ownerId")
      .populate("speakers")
      .exec();
    const allRoom = data.map((room) => new RoomDto(room));
    return res.json(allRoom);
  }
}

module.exports = new RoomController();
