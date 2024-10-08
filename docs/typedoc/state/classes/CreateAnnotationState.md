[**@ghentcdh/vue-component-annotated-text**](../../README.md) • **Docs**

***

[@ghentcdh/vue-component-annotated-text](../../modules.md) / [state](../README.md) / CreateAnnotationState

# Class: CreateAnnotationState

Class holding the state of an annotation being created

## Constructors

### new CreateAnnotationState()

> **new CreateAnnotationState**(`userState`): [`CreateAnnotationState`](CreateAnnotationState.md)

#### Parameters

• **userState**: [`UserState`](UserState.md)

#### Returns

[`CreateAnnotationState`](CreateAnnotationState.md)

#### Defined in

[src/state/states/CreateAnnotationState.ts:17](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L17)

## Properties

### annotation

> **annotation**: [`Annotation`](../../types/Annotation/interfaces/Annotation.md)

#### Defined in

[src/state/states/CreateAnnotationState.ts:13](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L13)

***

### creating

> **creating**: `boolean`

#### Defined in

[src/state/states/CreateAnnotationState.ts:14](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L14)

***

### newEnd

> **newEnd**: `number`

#### Defined in

[src/state/states/CreateAnnotationState.ts:11](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L11)

***

### newStart

> **newStart**: `number`

#### Defined in

[src/state/states/CreateAnnotationState.ts:12](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L12)

***

### userState

> **userState**: [`UserState`](UserState.md)

#### Defined in

[src/state/states/CreateAnnotationState.ts:15](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L15)

## Methods

### initAnnotation()

> **initAnnotation**(`annotation`): `void`

Initialise the annotation to be created.

#### Parameters

• **annotation**: [`Annotation`](../../types/Annotation/interfaces/Annotation.md)

annotation object that the application can pass to use
as default init value.

#### Returns

`void`

#### Defined in

[src/state/states/CreateAnnotationState.ts:50](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L50)

***

### resetCreating()

> **resetCreating**(): `void`

resets to the initial state

#### Returns

`void`

#### Defined in

[src/state/states/CreateAnnotationState.ts:25](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L25)

***

### startCreating()

> **startCreating**(`start`): `void`

start creating an annotation

#### Parameters

• **start**: `number`

position where the creation starts. The end position will not
be able to be before this starting position.

#### Returns

`void`

#### Defined in

[src/state/states/CreateAnnotationState.ts:39](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L39)

***

### updateCreating()

> **updateCreating**(): `void`

Has to be called every time the mouse moves a character when creating an
annotation. If the application does not listen to onMove updates the
component will do this automatically.

#### Returns

`void`

#### Defined in

[src/state/states/CreateAnnotationState.ts:61](https://github.com/GhentCDH/vue_component_annotated_text/blob/d51ee50afdd4ab5cda55f7357c95be62d9ee9e3f/src/state/states/CreateAnnotationState.ts#L61)
