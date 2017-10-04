const BaseController = require('./baseController');
const RoomManager = require('../services/roomManager');

class RoomController extends BaseController {
    constructor() {
        super();

        this.route.get('/api/rooms', (req, res) => {
            res.json(RoomManager.getRoomList());
        });
    }
}

module.exports = RoomController;