# Find the Dog Picture

## 퀴즈 설명

수진이는 약간의 강아지와 수 많은 고양이들을 모시고 있습니다. 이 중 강아지를 찾아 예방접종을 해야합니다. 고양이들 사이에서 가장 강아지를 잘 찾는 사람을 고용하고자 간단한 사전 테스트 게임을 만들기로 합니다.

테스트 게임의 룰은 다음과 같습니다.

* 시작 버튼을 누르면 시작합니다.
* 정사각형의 격자 위에 수많은 고양이 사진을 배치하고 그 중 하나의 강아지 사진을 포함합니다. 
* 퀴즈 내에 강아지 사진은 세션 당 10번 까지는 동일한 사진이 나타나지 않습니다.
* 강아지를 찾아 선택하면 정답으로 1점을 부여하고 다음 퀴즈로 넘어갑니다.
* 고양이를 선택하면 오답으로 점수를 부여하지 않고 다음 퀴즈로 넘어갑니다.
* **격자는 `2 * 2` 너비로 시작**하며 정답을 **2번 맞출 때마다 너비가 1 씩 증가**합니다.
* **8번 정답을 맞출 경우 게임이 종료**되고 보고서 페이지로 넘어갑니다.
* **퀴즈를 10번 풀면 게임이 종료**됩니다.

보고서 페이지의 요구사항은 다음과 같습니다.

* 다시하기 버튼을 누르면 게임으로 돌아갈 수 있습니다.
* 격자의 크기마다 사진을 선택하는대에 걸린 평균 시간과 정답률을 표기합니다.
  * 정답률은 소수점 두 자리까지 표기합니다.
* 총 정답 수, 오답 수, 정답률을 표기합니다.
* 시작 시간, 종료 시간, 총 게임 시간 을 표기합니다.

