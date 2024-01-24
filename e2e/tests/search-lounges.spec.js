import { test, expect } from '@playwright/test';
import axios from 'axios';

function allPossibleCombinations(input, length, curstr) {
    if(curstr.length == length) return [ curstr ];
    var ret = [];
    for(var i = 0; i < input.length; i++) {
        ret.push.apply(ret, allPossibleCombinations(input, length, curstr + input[i]));
    }
    return ret;
}

test.describe('Search for lounges', () => {
  test.describe('PPS-001 - check all codes', () => {
    test('User see available lounges', async ({ page }) => {
      // Arrange
      const startUrl = 'https://prioritypass.com';

      // open start page
      await page.goto(startUrl, {
        waitUntil: 'networkidle',
      });


      const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const combinations = allPossibleCombinations(alphabet, 3, '');
      const countComb = combinations.length;
      const lounges = [];
      const maxCombs = 50;
      let loungeCount = 0;

      for ( let i = 0; i < countComb && i < maxCombs; i += 1 ) {
        let airport = combinations[i];
        const request = `https://www.prioritypass.com/api/search/inventoryloungesearch?term=${airport}`;
    
        const res = await axios.get(request, {
          headers: { Accept: '*/*' },
        });
    
        const type = res.data[0].type;
        if (type) {
          const loungeData = res.data[0].data;
          loungeData.forEach((lounge) => {
            const loungeId = lounge.subheading.split(',')[0];
            const loungeUrl = lounge.url;
            const loungeObj = {"id": loungeId, "url": loungeUrl};
            console.log(loungeObj);
            if (!lounges.includes(loungeId)) {lounges.push(loungeObj)}
            loungeCount += 1;
          });
        }
      }

      const loungeAvailableCount = 0;
      for (let i = 0; i < loungeCount; i +=1 ) {
        const loungeFullUrl = `https://prioritypass.com${lounges[i].url}`;
        await page.goto(loungeFullUrl, {
            waitUntil: 'networkidle',
          });
        const element = await page.getByText('No results found');
        if(element == undefined ) {
            console.log('AVAILABLE ID: ', lounge[i].id);
            loungeAvailableCount += 1;
        }
      }

      console.log('total lounges: ', loungeCount);
      console.log('available lounges: ', loungeAvailableCount);

      expect(loungeCount).toBeGreaterThan(0);
    });
  });
});
