import { parseDate } from '../utility/dateHelper'

const past = "2018-06-19 09:17:30.231000";

it('parses date', () => {
  const res = parseDate(past)
  console.log(res);
  // expect(res).toBe('') 
});