fetch(`https://api.twelvedata.com/price?symbol=MYX:PETGAS&apikey=7f91e7f920cc435b80b5605738ccc713`)
  .then(res => res.json())
  .then(data => console.log(`PETGAS price: RM ${data.price}`));