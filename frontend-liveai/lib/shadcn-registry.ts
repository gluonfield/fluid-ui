import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";

import { registerComponent } from './registry';

// Register basic components
registerComponent('Button', Button, {
  displayName: 'Button',
  category: 'Basic',
  description: 'A button component with variants',
  validation: {
    props: {
      variant: {
        type: 'string',
        description: 'Button style variant',
      },
      size: {
        type: 'string',
        description: 'Button size',
      },
    },
  },
});

registerComponent('Input', Input, {
  displayName: 'Input',
  category: 'Basic',
  description: 'A text input field',
  validation: {
    props: {
      type: {
        type: 'string',
        description: 'Input type (text, number, etc)',
      },
      placeholder: {
        type: 'string',
        description: 'Placeholder text',
      },
    },
  },
});

// Register layout components
registerComponent('Card', Card, {
  displayName: 'Card',
  category: 'Layout',
  description: 'A card container component',
});

registerComponent('CardHeader', CardHeader, {
  displayName: 'Card Header',
  category: 'Layout',
  description: 'Header section of a card',
});

registerComponent('CardContent', CardContent, {
  displayName: 'Card Content',
  category: 'Layout',
  description: 'Content section of a card',
});

registerComponent('CardTitle', CardTitle, {
  displayName: 'Card Title',
  category: 'Layout',
  description: 'Title component for a card',
});

registerComponent('Separator', Separator, {
  displayName: 'Separator',
  category: 'Layout',
  description: 'A horizontal or vertical separator line',
  validation: {
    props: {
      orientation: {
        type: 'string',
        description: 'horizontal or vertical',
      },
    },
  },
});

// Register form components
registerComponent('Checkbox', Checkbox, {
  displayName: 'Checkbox',
  category: 'Form',
  description: 'A checkbox input component',
});

registerComponent('Label', Label, {
  displayName: 'Label',
  category: 'Form',
  description: 'A label for form inputs',
});

registerComponent('Switch', Switch, {
  displayName: 'Switch',
  category: 'Form',
  description: 'A toggle switch component',
});

registerComponent('Textarea', Textarea, {
  displayName: 'Textarea',
  category: 'Form',
  description: 'A multi-line text input',
});

// Register data display components
registerComponent('Progress', Progress, {
  displayName: 'Progress',
  category: 'Data Display',
  description: 'A progress indicator component',
  validation: {
    props: {
      value: {
        type: 'number',
        description: 'Progress value (0-100)',
      },
    },
  },
});

registerComponent('Badge', Badge, {
  displayName: 'Badge',
  category: 'Data Display',
  description: 'A badge or tag component',
  validation: {
    props: {
      variant: {
        type: 'string',
        description: 'Badge style variant',
      },
    },
  },
});

registerComponent('Avatar', Avatar, {
  displayName: 'Avatar',
  category: 'Data Display',
  description: 'An avatar component for user profiles',
});

registerComponent('AvatarImage', AvatarImage, {
  displayName: 'Avatar Image',
  category: 'Data Display',
  description: 'Image component for avatar',
  validation: {
    required: ['src'],
    props: {
      src: {
        type: 'string',
        required: true,
        description: 'Image source URL',
      },
    },
  },
});

registerComponent('AvatarFallback', AvatarFallback, {
  displayName: 'Avatar Fallback',
  category: 'Data Display',
  description: 'Fallback content for avatar',
});

// Register interactive components
registerComponent('Slider', Slider, {
  displayName: 'Slider',
  category: 'Interactive',
  description: 'A slider input component',
  validation: {
    props: {
      min: {
        type: 'number',
        description: 'Minimum value',
      },
      max: {
        type: 'number',
        description: 'Maximum value',
      },
      step: {
        type: 'number',
        description: 'Step increment',
      },
    },
  },
});

registerComponent('Toggle', Toggle, {
  displayName: 'Toggle',
  category: 'Interactive',
  description: 'A toggle button component',
  validation: {
    props: {
      pressed: {
        type: 'boolean',
        description: 'Toggle state',
      },
    },
  },
});

// Register date components
registerComponent('Calendar', Calendar, {
  displayName: 'Calendar',
  category: 'Date',
  description: 'A calendar date picker component',
  validation: {
    props: {
      mode: {
        type: 'string',
        description: 'single, multiple, or range',
      },
      selected: {
        type: 'object',
        description: 'Selected date(s)',
      },
    },
  },
});

// Register accordion components
registerComponent('Accordion', Accordion, {
  displayName: 'Accordion',
  category: 'Layout',
  description: 'A vertically stacked set of interactive headings',
});

registerComponent('AccordionContent', AccordionContent, {
  displayName: 'Accordion Content',
  category: 'Layout',
  description: 'Content section of an accordion item',
});

registerComponent('AccordionItem', AccordionItem, {
  displayName: 'Accordion Item',
  category: 'Layout',
  description: 'An individual accordion item',
});

registerComponent('AccordionTrigger', AccordionTrigger, {
  displayName: 'Accordion Trigger',
  category: 'Layout',
  description: 'Trigger button for an accordion item',
});

// Register alert components
registerComponent('Alert', Alert, {
  displayName: 'Alert',
  category: 'Feedback',
  description: 'Displays a callout for user attention',
});

registerComponent('AlertDescription', AlertDescription, {
  displayName: 'Alert Description',
  category: 'Feedback',
  description: 'Description text for an alert',
});

registerComponent('AlertTitle', AlertTitle, {
  displayName: 'Alert Title',
  category: 'Feedback',
  description: 'Title text for an alert',
});

// Register aspect ratio component
registerComponent('AspectRatio', AspectRatio, {
  displayName: 'Aspect Ratio',
  category: 'Layout',
  description: 'Maintains a consistent aspect ratio',
  validation: {
    props: {
      ratio: {
        type: 'number',
        description: 'The desired aspect ratio (width/height)',
      },
    },
  },
}); 