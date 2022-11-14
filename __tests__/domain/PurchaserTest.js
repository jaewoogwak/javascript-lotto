const App = require('../../src/App');
const Purchaser = require('../../src/domain/Purchaser');
const Lotto = require('../../src/Lotto');

describe('로또 클래스 테스트', () => {
  /**
   * buyLotto()
   * 정수값을 받으면 해당 수만큼의 Lotto 객체를 배열로 반환하는 함수
   */
  test('buyLotto 함수가 리턴하는 배열 요소가 Lotto 타입인지 검사', () => {
    const input = 3;
    const purchaser = new Purchaser();

    purchaser
      .buyLotto(input)
      .forEach((lotto) => expect(lotto).toBeInstanceOf(Lotto));
  });

  test('buyLotto 함수가 리턴하는 배열 길이가 로또 구매 갯수와 일치하는지 검사', () => {
    const input = 3;
    const purchaser = new Purchaser();

    expect(purchaser.buyLotto(input)).toHaveLength(input);
  });

  /**
   * createToken()
   * 정수값을 받으면 해당 수만큼의 토큰을 반환하는 함수
   */
  test('입력된 숫자만큼 토큰을 리턴하지 않으면 예외가 발생한다.', () => {
    const input = 3;
    const purchaser = new Purchaser();

    expect(purchaser.createToken(input).length).toBe(input);
  });

  /**
   * compare()
   * 로또 번호와 당첨 번호 및 보너스 번호를 비교하여 각각 몇 개나 일치하는지 객체로 반환하는 함수
   */
  test('로또 번호와 당첨 번호 및 보너스 번호를 올바르게 비교하는지 검사', () => {
    const purchaser = new Purchaser();
    const lottoToken = [1, 4, 6, 23, 28, 40];
    const winnerNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    expect(purchaser.compare(lottoToken, winnerNumber, bonusNumber)).toEqual({
      count: 3,
      bonus: 0,
    });
  });

  /**
   * computeMatchingNumber()
   * 로또 번호와 당첨 번호 및 보너스 번호가 일치하는 개수를 배열로 반환하는 함수
   */
  test('로또 번호와 일치하는 개수만큼 계산된 배열을 리턴하는지 검사', () => {
    const purchaser = new Purchaser();
    const count = 3;
    const bonus = 1;
    const matchedCountList = [0, 0, 0, 1, 1, 1, 0, 0];
    expect(
      purchaser.computeMatchingNumber(count, bonus, matchedCountList)
    ).toEqual([0, 0, 0, 2, 1, 1, 0, 0]);
  });

  /**
   * computeRevenue()
   * 수익의 합계를 계산하는 함수
   */
  test('수익의 합계를 올바르게 계산하는지 검사', () => {
    const purchaser = new Purchaser();
    const matchedCountList = [1, 1, 0, 1, 0, 0, 0, 0];
    expect(purchaser.computeRevenue(matchedCountList)).toBe(5000);
  });

  /**
   * getReturnRate()
   * 수익률을 반환하는 함수
   */
  test('수익률이 소수점 둘째 자리에서 반올림 되는지 검사', () => {
    const purchaser = new Purchaser();
    const money = 7000;
    const revenue = 5000;
    expect(purchaser.getReturnRate(money, revenue)).toBe(71.4);
  });
});
