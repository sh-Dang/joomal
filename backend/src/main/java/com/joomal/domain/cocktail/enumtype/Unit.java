package com.joomal.domain.cocktail.enumtype;

import lombok.Getter;

@Getter
/*
  레시피 재료 단위(Enum)

  DB에는 Enum 상수명(ML, OZ ...)이 저장되고,
  사용자에게 보여줄 때는 description 값을 사용한다.

  1. DB에는 변경되지 않는 코드값을 저장
  2. 화면 표시용 문구를 자유롭게 변경하기 위함
 */
public enum Unit {

    ML("밀리리터", "ml"),
    OZ("온스", "oz"),
    DASH("대시", "dash"),
    DROP("방울", "drop"),
    LEAF("장", "leaf"),
    PIECE("조각", "piece"),
    TSP("티스푼", "tsp"),
    TBSP("테이블스푼", "tbsp"),
    EA("개", "ea");

    /**
     * 사용자에게 보여줄 한글 이름
     * -- GETTER --
     *  단위의 화면 표시명을 반환한다.
     *  예)
     *  Unit.OZ.getDescription()
     *  -> "온스"
     *  백엔드에서 getDescription()을 사용하여 단위를 한글로 변환 후 프론트엔드에 반환해준다.
     */
    private final String korDescription;

    /**
     * 사용자에게 보여줄 영문 이름
     * 예)
     * Unit.OZ.getEngDescription()
     * -> "oz"
     * 백엔드에서 getEngDescription()을 사용하여 단위를 영문으로 변환 후 프론트엔드에 반환해준다.
     */
    private final String engDescription;

    Unit(String korDescription,String engDescription) {
        this.korDescription = korDescription;
        this.engDescription = engDescription;
    }

}