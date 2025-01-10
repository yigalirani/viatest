import type { Trip,Bus } from 'server';
async function getcontent(url:string) {
  const response = await fetch(url);
  return await response.json();
}
function calc_conflicts(bus:Bus){
  bus.trips.sort((a,b)=>a.start-b.end);
  let last_trip=bus.trips[0]!;
  for (const trip of bus.trips.slice(0,-1)){
    if (trip.start<last_trip.end){
      trip.conflicts=true;
      bus.conflicts=true;
    }
    last_trip=trip;
  }
  return bus
}
function  calc_buses(trips:Trip[]): Bus[]{
  const ans:Record<number,Bus> = {}
  for (const trip of trips){
    const bus:Bus= ans[trip.bus_id] || {bus_id: trip.bus_id, trips: []}
    ans[trip.bus_id] = bus
    bus.trips.push(trip)
  }
  return Object.values(ans).map(calc_conflicts).sort((a,b)=>a.bus_id-b.bus_id)
}
function render_trips(trips:Trip[]){
  const buses = calc_buses(trips);
  return `<pre>${JSON.stringify(buses, null, 2)}</pre>`
}
async function run_app(){
  const body = document.querySelector('body');
  if (!body)
    return
  const trips = await getcontent('/get_trips') as Trip[]; //todo: validated that ineed formated as Trips?
  body.innerHTML = render_trips(trips);
}
run_app()