import type {Trips} from './api';
export const starting_schedule:Trips={
  trips:[
    {
      trip_id: 1,
      start:6,//between 0 and 24
      end:8,//between 0 and 24, must be greater than start
      bus_id: 1,
    },
    {
      trip_id: 2,
      start:9,//between 0 and 24
      end:11,//between 0 and 24, must be greater than start
      bus_id: 1,
    },
    {
      trip_id: 3,
      start:12,//between 0 and 24
      end:14,//between 0 and 24, must be greater than start
      bus_id: 1,
    },   
    
    {
      trip_id: 4,
      start:6,//between 0 and 24
      end:8,//between 0 and 24, must be greater than start
      bus_id: 2,
    },
    {
      trip_id: 5,
      start:9,//between 0 and 24
      end:11,//between 0 and 24, must be greater than start
      bus_id: 2,
    },
    {
      trip_id: 6,
      start:12,//between 0 and 24
      end:14,//between 0 and 24, must be greater than start
      bus_id: 2,
    },  
    {
      trip_id: 7,
      start:15,//between 0 and 24
      end:16,//between 0 and 24, must be greater than start
      bus_id: 2,
    },   
    {
      trip_id: 8,
      start:12,//between 0 and 24
      end:14,//between 0 and 24, must be greater than start
      bus_id: 3,
    },  
    {
      trip_id: 9,
      start:15,//between 0 and 24
      end:16,//between 0 and 24, must be greater than start
      bus_id: 3,
    },              
  ],
}
