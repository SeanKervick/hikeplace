import { db } from "../models/db.js";
import { HikeSpec } from "../models/joi-schemas.js";


export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  addHike: {
    validate: {
      payload: HikeSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentLocation = await db.locationStore.getLocationById(request.params.id);
        return h.view("location-view", { title: "Add Hike error", location:currentLocation, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newHike = {
        hikeName: request.payload.hikeName,
        description: request.payload.description,
        difficulty: request.payload.difficulty,
        length: Number(request.payload.length),
        elevation: request.payload.elevation,
      };
      await db.hikeStore.addHike(location._id, newHike);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteHike: {
    handler: async function(request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.hikeStore.deleteHike(request.params.hikeid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};