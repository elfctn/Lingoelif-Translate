import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions";
import Select from "react-select";
import { setAnswer } from "./redux/slices/translateSlice";
import React from "react";

const App = () => {
  const langState = useSelector((store) => store.language);
  const translateState = useSelector((store) => store.translate);

  const [sourceLang, setSourceLang] = useState({
    value: "TR",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "EN",
    label: "English",
  });
  const [text, setText] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      langState.languages?.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText(translateState.answer);
    dispatch(setAnswer(text));
  };

  return (
    <>
      <div className="bg-white h-screen text-black grid place-items-center">
        <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
          <h1 className="text-center text-6xl font-semibold mb-7 text-rose-600 flex items-center justify-center gap-4">
            LingoElif{" "}
            <img src="/lingoelif.svg" alt="app_icon" className="w-16 h-16" />
          </h1>

          <div className="flex gap-2">
            <Select
              onChange={(lang) => setSourceLang(lang)}
              value={sourceLang}
              isDisabled={langState.isLoading}
              isLoading={langState.isLoading}
              options={formatted}
              className="flex-1"
            />

            <button
              onClick={handleSwap}
              className="rounded py-2 px-6 bg-rose-100 text-black transition hover:ring-2 hover:bg-rose-200"
            >
              Değiş
            </button>

            <Select
              onChange={(lang) => setTargetLang(lang)}
              value={targetLang}
              isDisabled={langState.isLoading}
              isLoading={langState.isLoading}
              options={formatted}
              className="flex-1"
            />
          </div>

          <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded border border-rose-200 focus:ring-2 focus:ring-rose-400"
            />

            <div className="w-full relative">
              <textarea
                disabled
                className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded border border-rose-200 text-gray-700 bg-gray-100"
                value={translateState.answer}
              />

              {translateState.isLoading && (
                <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] text-rose-500">
                  Yükleniyor...
                </h1>
              )}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-rose-500 text-white mt-3 hover:ring-2 hover:bg-rose-600 transition"
          >
            Çevir
          </button>
        </div>
      </div>

      <footer className="w-full text-center text-gray-400 text-sm py-2 fixed bottom-0 left-0 select-none pointer-events-none">
        2025 - ELIFCETIN
      </footer>
    </>
  );
};

export default App;
