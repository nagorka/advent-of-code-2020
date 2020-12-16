-module(day13b).

-export([timestamp/1]).

timestamp(File) ->
    {ok, Binary} = file:read_file(File),
    Data = binary:bin_to_list(Binary),
    Lines = string:tokens(Data, "\n"),
    [_, Input] = Lines,
    List = get_data(Input),
    compute(List, []).

get_data(Input) ->
    {List,_} = lists:foldl(fun(I, { Acc, Index }) ->
        case I of
            "x" -> { Acc, Index + 1 };
            _ ->
                Int = list_to_integer(I),
                { [{Int, -Index}|Acc], Index + 1 }
        end
    end, { [], 0 }, string:tokens(Input, ",")),
    lists:reverse(List).

compute([{_,N}], Acc) ->
    lists:foldl(fun({K,P}, M) ->
        K*M + P
    end, N, Acc);
compute([A|Rest], Acc) ->
    Solutions = [find_sol(A,X,0) || X <- Rest],
    compute(Solutions, [A|Acc]).
    
find_sol({K1,P1} = A, {K2,P2} = B, I) ->
    Result = (K2*I + P2 - P1)/K1,
    case is_float_integer(Result) of
        true ->
            { K2, (trunc(Result) + K2) rem K2};
        false ->
            find_sol(A, B, I+1)
    end.

is_float_integer(X) ->
    X - trunc(X) =:= 0.0.
    
