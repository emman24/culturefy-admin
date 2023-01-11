import { useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { registerMyQuestion } from "../SurveyQuestions/SurveyQuestions";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { useBusinessQuestions } from 'src/@core/hooks/form/useBusinessQuestions'
import { useRouter } from 'next/router'

registerMyQuestion();

export default function SurveyCreatorWidget(props: { json: any; }) {
  const router = useRouter();

  const { updateBusinessQuestions } = useBusinessQuestions(null);
  const { id } = router.query || null || '';
  console.log('businessId ', id)

  let [creator, setCreator] = useState<any>();
  const [survey, setSurvey] = useState("")

  if (creator === undefined) {
    let options = { showLogicTab: false, showTranslationTab: false, haveCommercialLicense: true, showJSONEditorTab: false };
    creator = new SurveyCreator(options);
    creator.saveSurveyFunc = (no: any, callback: any) => {
      // console.log('creator.JSON ',JSON.stringify(creator.JSON));
      // setSurvey(JSON.stringify(creator.JSON))
      setSurvey(creator.JSON)
      callback(no, true);
      if(!id) return;
      updateBusinessQuestions(id,survey)
    };
    setCreator(creator);
  }
  // console.log('survey ',survey?.pages[0].elements)
  
  creator.JSON = props.json;

  return (
    <div style={{ height: "calc(100% - 70px)" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
