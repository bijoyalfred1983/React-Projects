/* @flow */
import type { RepairGuideData, Action } from '../types';

const initialState = {
  readyStatus: 'FETCH_REPAIRGUIDS_INVALID',
  repairGuidesData: {},
  chapterData: {},
  err: ''
};

const repairGuides = (
  state: RepairGuideData = initialState,
  action: Action
): RepairGuideData => {
  switch (action.type) {
    case 'FETCH_REPAIRGUIDS_REQUESTING':
      return {
        ...state,
        readyStatus: 'FETCH_REPAIRGUIDS_REQUESTING'
      };
    case 'FETCH_REPAIRGUIDS_FAILURE':
      return {
        ...state,
        readyStatus: 'FETCH_REPAIRGUIDS_FAILURE',
        err: action.err
      };
    case 'FETCH_REPAIRGUIDS_SUCCESS':
      return {
        ...state,
        readyStatus: 'FETCH_REPAIRGUIDS_SUCCESS',
        repairGuidesData: action.data
      };
    case 'FETCH_REPAIRGUIDS_CHAAPTERS_FAILURE':
      return {
        ...state,
        err: action.err
      };
    case 'FETCH_REPAIRGUIDS_CHAAPTERS_SUCCESS': {
      const chapterData = action.data;
      let { sections } = chapterData;
      const { sectionTitles } = chapterData;
      sections =
        sections &&
        sections.map((section, sectionIndex) => {
          const sectionData = section;
          sectionData.sectionName = `${sectionIndex + 1}. ${
            sectionData.sectionName
          }`;
          return sectionData;
        });
      const sectionTitlesId =
        sectionTitles &&
        Object.keys(sectionTitles).length > 0 &&
        Object.keys(sectionTitles)[0];
      sectionTitles[sectionTitlesId] =
        sectionTitles &&
        sectionTitles[sectionTitlesId] &&
        sectionTitles[sectionTitlesId].length > 0 &&
        sectionTitles[sectionTitlesId].map((sectionTitle, index) => {
          const mainPageIndex =
            sections.findIndex(item => sectionTitlesId === item.pageID) || 0;
          const sectionTitleData = sectionTitle;
          sectionTitleData.titleName = `${mainPageIndex + 1}.${index + 1}. ${
            sectionTitleData.titleName
          }`;
          sectionTitleData.pageNumber = `${mainPageIndex + 1}.${index + 1}`;
          return sectionTitleData;
        });
      chapterData.sections = sections;
      chapterData.sectionTitles = sectionTitles;
      return {
        ...state,
        chapterData
      };
    }
    default:
      return state;
  }
};

export default repairGuides;
