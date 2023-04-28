import './style.css';
import axios from 'axios';
import * as h337 from 'heatmap.js';

const API_URL = '/api/nft/collection/stats';
const heatmapContainer = document.getElementById('heatmapContainer');

axios.get(API_URL)
  .then(response => {
    const data = response.data;
    console.log('API response:', data); // Add this line

    const heatmapData = data.slice(0, 50).map((collection, index) => {
      return {
        x: (index % 10) * 70 + 35,
        y: Math.floor(index / 10) * 70 + 35,
        value: collection.market_cap_in_solana,
      };
    });

    const maxValue = Math.max(...heatmapData.map(d => d.value));

    const heatmapInstance = h337.create({
      container: heatmapContainer,
      radius: 50,
    });

    heatmapInstance.setData({
      max: maxValue,
      data: heatmapData,
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
