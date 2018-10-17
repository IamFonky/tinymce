import { ValueSchema } from '@ephox/boulder';
import { InlineContent } from '@ephox/bridge';
import { Obj, Arr, Unique } from '@ephox/katamari';

export interface AutocompleterDatabase {
  dataset: Record<string, InlineContent.Autocompleter>;
  triggerChars: string[];
  lookupByChar: (ch: string) => InlineContent.Autocompleter[];
}

const register = (editor): AutocompleterDatabase => {
  const popups = editor.ui.registry.getAll().popups;
  const dataset = Obj.map(popups, (popup) => {
    return InlineContent.createAutocompleter(popup).fold(
      (err) => {
        throw new Error(ValueSchema.formatError(err));
      },
      (x) => x
    );
  });

  const triggerChars = Unique.stringArray(
    Obj.mapToArray(dataset, (v) => v.ch)
  );

  const datasetValues = Obj.values(dataset);

  const lookupByChar = (ch: string): InlineContent.Autocompleter[] => {
    return Arr.filter(datasetValues, (dv) => dv.ch === ch);
  };

  return {
    dataset,
    triggerChars,
    lookupByChar
  };
};

export {
  register
};