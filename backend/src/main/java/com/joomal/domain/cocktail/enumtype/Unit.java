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

    ML("밀리리터"),
    OZ("온스"),
    DASH("대시"),
    DROP("방울"),
    LEAF("장"),
    PIECE("조각"),
    TSP("티스푼"),
    TBSP("테이블스푼"),
    EA("개");

    /**
     * 사용자에게 보여줄 한글 이름
     * -- GETTER --
     *  단위의 화면 표시명을 반환한다.
     *  예)
     *  Unit.OZ.getDescription()
     *  -> "온스"
     *  백엔드에서 getDescription()을 사용하여 단위를 한글로 변환 후 프론트엔드에 반환해준다.
     */
    private final String description;

    Unit(String description) {
        this.description = description;
    }

}