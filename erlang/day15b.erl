-module(day15b).

-export([speak/2]).

speak(List, Count) -> 
    {Start, Turn} = lists:foldl(fun(X, {Acc, Turn}) ->
        {Acc#{X => {Turn, nil}, last => X}, Turn + 1}
    end, {#{}, 1}, List),
    speak(Start, Turn, Count).

speak(Map, X, Y) when X > Y -> maps:get(last,Map);
speak(Map, Turn, Count) ->
    #{last := Num} = Map,
    #{Num :=  T} = Map,
    NextNum = case T of
        {_, nil} -> 0;
        {A, B} -> A - B
    end,
    NextTuple = case  maps:find(NextNum, Map) of
        {ok, {P,_}} ->
            {Turn, P};
        error ->
            {Turn, nil}
    end,
    speak(Map#{last => NextNum, NextNum => NextTuple}, Turn + 1, Count).


