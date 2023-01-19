// @ts-nocheck
import { useEffect, useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
// import { registerMyQuestion } from "../SurveyQuestions/SurveyQuestions";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { useBusinessQuestions } from 'src/@core/hooks/form/useBusinessQuestions'
import { useRouter } from 'next/router'

// registerMyQuestion();

export default function SurveyCreatorWidget(props: { json: any; }) {
  const router = useRouter();
  const { updateBusinessQuestions, getBusinessQuestions, store: { businessQuestions } } = useBusinessQuestions(null);
  const { id } = router.query || null || '';

  let [creator, setCreator] = useState<any>();

  useEffect(() => {
    if (!id) return;
    getBusinessQuestions(id);
  }, [id])

    if (creator === undefined) {
      let options = { showLogicTab: false, showTranslationTab: false, haveCommercialLicense: true, showJSONEditorTab: false };
      creator = new SurveyCreator(options);
      creator.saveSurveyFunc = (no: any, callback: any) => {
        callback(no, true);
        if (!id) return;
        const jsonUp = JSON.stringify(creator.JSON);
        // console.log('jsonUp ',jsonUp)
        updateBusinessQuestions(
          businessQuestions?._id,
          {
            question: jsonUp,
            business: id,
          }
        )
        getBusinessQuestions(id);
  
      };
      setCreator(creator);
    }

  // console.log('props.json ',props.json);
  // console.log('businessQuestions?.question ', JSON.parse(businessQuestions?.question));

  
  // creator.JSON = props.json;
  creator.JSON = props.json;


  return (
    <div style={{ height: "calc(100% - 70px)" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>
  );
}
